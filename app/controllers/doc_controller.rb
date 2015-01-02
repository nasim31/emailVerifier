class DocController < ApplicationController
  def index
    render :json => Document.all.to_json
  end
  def create
    doc = Document.new()
    doc.file = params[:file]
    title = params[:file].original_filename.split(".")
    doc.title = title[0]
    doc.filetype = title[1]
    doc.created_at = Time.now
    doc.save
    render :json => doc
  end
  def destroy
    render :json => Document.find(params[:id]).delete
  end
end