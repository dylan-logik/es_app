class TweetsController < ApplicationController
  respond_to :html, :json

  def index
    response  = Tweet.all(params)

    # NOTE: Use RABL
    @tweets   = response.results
    @facets   = response.facets.map { |k,v| v.update({ name: k }) }
    @page     = params[:page] ? params[:page].to_i : 1
    @perPage  = 10
    @total    = response.total

    @response = { results: @tweets, facets: @facets, page: @page, perPage: @perPage, total: @total }

    respond_with(@response)
  end

  def search
    response = Tweet.search(params)

    # NOTE: Use RABL
    @tweets   = response.results
    @facets   = response.facets.map { |k,v| v.update({ name: k }) }
    @page     = params[:page] ? params[:page].to_i : 1
    @perPage  = 10
    @total    = response.total

    @response = { results: @tweets, facets: @facets, page: @page, perPage: @perPage, total: @total }
    respond_with(@response)
  end

  def show
    @response = Tweet.find(params[:id])
    respond_with(@response)
  end
end
