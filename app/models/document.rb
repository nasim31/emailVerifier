class Document
  include Mongoid::Document
  mount_uploader :files, DocumentsUploader
  field :files
  has_one :file_header
  has_many :file_records

  def self.processDoc(docId)
    doc = Document.find(docId)
    file = File.join(Rails.root,"/public/",doc.files.url)
    file = Roo::Excelx.new(file)
    sheetOne = file.sheet(0)
    rowNum = 0
    header = []
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
      doc.file_records.create(insertingData)
    end
  end
end