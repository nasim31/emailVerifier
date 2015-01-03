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

  has_one :file_header
  has_many :file_records

  def self.processDoc(docId)
    doc = Document.find(docId)
    doc.update_attributes(:status => "Parsing")
    file = File.join(Rails.root,"/public/",doc.file.url)
    file = Roo::Excelx.new(file)
    sheetOne = file.sheet(0)
    rowNum = 0
    header = []
    parsedRecords = 0;
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
    doc.update_attributes(:status => "Parsed", :noOfRecords => parsedRecords)
    return true
  end

  def self.verifyRecords(docId)
    doc = Document.find(docId)
    doc.file_records.each do |record|
      # record[doc.columnToVerify]

      binding.pry
    end
  end

  def self.downloadRequest(docId)
    doc = Document.find(docId)
    doc.update_attributes(:downloadRequest => true)
    binding.pry
  end
end