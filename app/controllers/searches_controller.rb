class SearchesController < ApplicationController
  respond_to :html, :json

  def history
    @searches = Search.all
    respond_with(@searches)    
  end
  
  def search
    klass = params[:type] ? params[:type].classify.constantize : Tweet
    if klass.respond_to?(:search)
      @response = klass.search(params)
      respond_with(@response)
    else
      # Do something
    end
  end

  def show
    @search = Search.find(params[:id])
    respond_with(@search)
  end

  def create
    @search = Search.create(params[:search])
    respond_with(@search)
  end

  def update
    @search = Search.find(params[:id])
    @search.update_attributes(params[:search])
    respond_with(@search)
  end

  def destroy
    Search.find(params[:id]).destroy
  end

end
