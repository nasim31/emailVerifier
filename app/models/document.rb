class Document
  include Mongoid::Document
  mount_uploader :file, DocumentsUploader
  field :file
  field :filetype
  field :noOfRecords
  field :title
  field :status
  field :downloadRequest
  field :columnToVerify
  field :created_at
  field :user_id
  
  belongs_to :user
  has_one :file_header, dependent: :destroy
  has_many :file_records, dependent: :destroy

  def self.processDoc(docId)
    doc = Document.find(docId)
    file = File.join(Rails.root,"/public/",doc.file.url)
    rowNum = 0
    header = []
    parsedRecords = 0;
    if(doc.filetype == 'xlsx')
      file = Roo::Excelx.new(file)
      sheetOne = file.sheet(0)
      sheetOne.each do |row|
        if rowNum == 0
          rowNum = 1
          #Header
          header = row
          i = 0
          insertingData = {}
          header.each do |title|
            i += 1
            insertingData["column#{i}"] = title
          end
          doc.create_file_header(insertingData)
          next
        end
        insertingData = {}
        i = 0
        row.each do |data|
          i += 1
          insertingData["column#{i}"] = data
        end
        parsedRecords += 1
        doc.file_records.create(insertingData)
      end
    end
    if(doc.filetype == 'dbf')
      widgets = DBF::Table.new(file)
      widgets.each do |record|
        if(rowNum == 0)
          rowNum = 1
          # binding.pry
          header = record
          i = 0
          insertingData = {}
          header.attributes.each do |key,value|
            i += 1
            insertingData["column#{i}"] = key
          end
          doc.create_file_header(insertingData)
        end
        insertingData = {}
        i = 0
        record.attributes.each do |key,value|
          i += 1
          insertingData["column#{i}"] = value
        end
        parsedRecords += 1
        doc.file_records.create(insertingData)
      end
    end
    doc.update_attributes(:status => "Parsed", :noOfRecords => parsedRecords)
    return true
  end

  def self.verifyRecords(docId,session_id)
    doc = Document.find(docId)
    updated = 0
    doc.file_records.where(:status => nil).each do |record|
      updated += 3
      Document.delay(run_at: updated.seconds.from_now,:queue => "VerifyingEmail#{docId}").verifyNow(record._id,session_id)
    end
  end

  def self.verifyNow(recordId,session_id)
    record = FileRecord.includes(:document).find(recordId)
    begin
      if EmailVerifier.check(record[record.document.columnToVerify])
        record.update_attributes(:status => "Active")
      else
        record.update_attributes(:status => "InActive")
      end
    rescue
      record.update_attributes(:status => "Error")
    end
    PrivatePub.publish_to "/#{session_id}", :addUp => "#{record.document._id}_#{record.status}"
  end

  def self.to_csv(options = {}, docId)
    doc = Document.find(docId)
    ignored_attributes = ["_id"]
    @header = doc.file_header
    @all_rows = doc.file_records

    CSV.generate(options) do |csv|
      csv << @header.attributes.delete_if{ |attr, value| ignored_attributes.include?(attr) }.values      
      @all_rows.each  do |record|
        csv << record.attributes.delete_if{ |attr, value| ignored_attributes.include?(attr) }.values
      end 
    end
  end

  def self.updateStatus(docId)
    doc = Document.includes(:file_records).find(docId)
    parsedRecords = doc.file_records.where(:status => 'Active').count()
    parsedRecords += doc.file_records.where(:status => 'InActive').count()
    parsedRecords += doc.file_records.where(:status => 'Error').count()
    if(doc.noOfRecords == parsedRecords)
      doc.update_attributes(:status => "Completed")
    end
  end

  def self.abortJobs(queue)
    Delayed::Job.where(:queue => queue).delete
  end
end