class TweetsController < ApplicationController
  respond_to :html, :json

  def index
    response  = Tweet.all(params)
    @tweets   = response.results
    @facets   = response.facets
    @page     = params[:page]
    @perPage  = 10
    @total    = (response.total / @perPage).ceil

    respond_with({ tweets: @tweets, facets: @facets, page: @page, perPage: @perPage, total: @total })
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
