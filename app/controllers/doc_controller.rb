class DocController < ApplicationController
  def create
    doc = Document.new()
    doc.file = params[:file]
    doc.save
  end
en