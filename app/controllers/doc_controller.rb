class DocController < ApplicationController
  def create
    doc = Document.new()
    doc.files = params[:file]
    doc.save
    render :json => doc
  end
end