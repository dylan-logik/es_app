class TweetsController < ApplicationController
  respond_to :html, :json

  def show
    @response = Tweet.find(params[:id])
    respond_with(@response)
  end

  def update
    @tweet = Tweet.find(params[:id])
    @tweet.update_attributes(params[:tweet])
    respond_with(@tweet)
  end

  def destroy
    Tweet.find(params[:id]).destroy
  end
end
