class DocController < ApplicationController
  def index
    render :json => Document.all.to_json
  end
  def create
    doc = Document.new()
    doc.files = params[:file]
    doc.save
    render :json => doc
  end
  def destroy
    render :json => Document.find(params[:id]).delete
  end
end