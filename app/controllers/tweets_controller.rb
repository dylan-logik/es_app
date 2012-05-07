class TweetsController < ApplicationController
  respond_to :html, :json

  def search
    @response = Tweet.search(params[:query])
    @page = params[:page] && params[:page].to_i >= 1 ? params[:page].to_i : 1
    @perPage = 10
    respond_with(@response)
  end

  def show
    @response = Tweet.find(params[:id])
    respond_with(@response)
  end

  def update
    tweet = Tweet.find(params[:id])
    tweet.update_attributes(params[:tweet])
    respond_with(tweet)
  end
end
