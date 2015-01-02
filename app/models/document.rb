class Document
  include Mongoid::Document
  mount_uploader :file, DocumentsUploader
  field :file
  field :filetype
  field :title
  field :created_at

  has_one :file_header
  has_many :file_records

  def self.processDoc(docId)
    doc = Document.find(docId)
    file = File.join(Rails.root,"/public/",doc.file.url)
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

  def self.downloadFile(docId)
    doc = Document.find(docId)
    doc.file_header
  end
end