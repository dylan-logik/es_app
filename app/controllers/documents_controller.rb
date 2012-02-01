class DocumentsController < ApplicationController
  respond_to :html, :json

  def index
    @response = Document.all
    respond_with(@response)
  end

  def search
    @response = Document.search(params)
    respond_with(@response)
  end

  def show
    @response = Document.find(params[:id])
    respond_with(@response)
  end
end
