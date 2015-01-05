class DocController < ApplicationController
  def index
    documents = []
    Document.includes(:file_header,:file_records).each do |doc|
      doc[:file_header] = doc.file_header
      documents.push(doc)
      if(doc.status == "Verifying")
        Document.delay(:queue => 'UpdatingStatus').updateStatus(doc._id)
      end
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
    if doc.save
      render :json => {:status => true, :id => params[:id]}
    else 
      render :json => {:status => false, :id => params[:id]}
    end
  end
  def show
    doc = Document.includes(:file_records).find(params[:id])
    doc[:active] = doc.file_records.where(:status => 'Active').count()
    doc[:inactive] = doc.file_records.where(:status => 'InActive').count()
    doc[:error] = doc.file_records.where(:status => 'Error').count()
    render :json =>  doc
  end
  def destroy
    render :json => Document.find(params[:id]).delete
  end
  def parseFile
    doc = Document.find(params[:doc][:id])
    doc.update_attributes(:status => "Parsing")
    Document.delay(:queue => 'ParsingDoc').processDoc(params[:doc][:id])
    render :json => Document.find(params[:doc][:id])
  end
  def verifyRecords
    doc = Document.find(params[:doc][:id])
    doc.update_attributes(:status => "Verifying",:columnToVerify => params[:doc][:field])
    Document.delay(:queue => 'VerifyRequest').verifyRecords(params[:doc][:id],current_user._id)
    render :json => Document.find(params[:doc][:id])
  end
  def downloadRequest
    respond_to do |format|
      format.html  # index.html.erb
      format.csv  { 
        send_data Document.to_csv(params[:id])
      }
      format.xls  { 
        send_data Document.to_csv({:col_sep => "\t"},params[:id])
      }
    end
  end
  def abortJob
    doc = Document.find(params[:doc][:id])
    doc.update_attributes(:status => "Aborted")
    Document.abortJobs("VerifyingEmail#{doc._id}")
  end
  def to_json(*args)
    super(args.merge({:include => :file_header}))
  end
end