class DocumentsController < ApplicationController
  respond_to :html, :json

  def index
    user_query = params[:q] ? params[:q] : "*:*"
    @response = Document.search do |search|
      search.query do |query|
        query.string user_query
      end
    end

    respond_with(@response)
  end

  def show
    @response = Document.search do |search|
      search.query do |query|
        query.term :_id, params[:id]
      end
    end

    respond_with(@response)
  end
end
