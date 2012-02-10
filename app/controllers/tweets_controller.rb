class TweetsController < ApplicationController
  respond_to :html, :json

  def index
    response  = Tweet.all(params)
    @tweets   = response.results
    @facets   = response.facets.map { |k,v| v.update({ name: k }) }
    @page     = params[:page].to_i
    @perPage  = 10
    @total    = response.total
    @pages    = (@total.to_f / @perPage.to_f).ceil
    @response = { tweets: @tweets, facets: @facets, page: @page, perPage: @perPage, total: @total, pages: @pages }
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
