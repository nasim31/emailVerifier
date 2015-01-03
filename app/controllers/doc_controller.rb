class DocController < ApplicationController
  def index
    documents = []
    Document.includes(:file_header).each do |doc|
       doc[:file_header] = doc.file_header
       documents.push(doc)
    end
    render :json => documents
  end
  def create
    doc = Document.new()
    doc.file = params[:file]
    title = params[:file].original_filename.split(".")
    doc.title = title[0]
    doc.filetype = title[1]
    doc.noOfRecords = 0
    doc.status = "Not started"
    doc.created_at = Time.now
    doc.save
    render :json => doc
  end
  def show
    render :json => Document.find(params[:id]).file_records
  end
  def destroy
    render :json => Document.find(params[:id]).delete
  end
  def parseFile
    doc = Document.find(params[:doc][:id])
    doc.update_attributes(:status => "Parsing")
    Document.delay.processDoc(params[:doc][:id])
    render :json => Document.find(params[:doc][:id])
  end
  def verifyRecords
    doc = Document.find(params[:doc][:id])
    doc.update_attributes(:status => "Verifying",:columnToVerify => params[:doc][:field])
    Document.verifyRecords(params[:doc][:id])
    render :json => Document.find(params[:doc][:id])
  end
  def downloadRequest
    doc = Document.find(params[:doc][:id])
    doc.update_attributes(:downloadRequest => true)
    Document.downloadRequest(params[:doc][:id])
    render :json => doc
  end

  def to_json(*args)
    super(args.merge({:include => :file_header}))
  end
end