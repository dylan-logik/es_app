class TweetsController < ApplicationController
  respond_to :html, :json

  def index
    response  = Tweet.all(params)

    # NOTE: Move to Model or use RABL
    @tweets   = response.results
    @facets   = response.facets.map { |k,v| v.update({ name: k }) }
    @page     = params[:page] ? params[:page].to_i : 1
    @perPage  = 10
    @total    = response.total
    page_info = { page: @page, perPage: @perPage, total: @total }

    @response = { results: @tweets, facets: @facets, page_info: page_info }

    respond_with(@response)
  end

  def search(params)
    @response = Tweet.search(params)
    respond_with(@response)
  end

  def show
    @response = Tweet.find(params[:id])
    respond_with(@response)
  end
end
