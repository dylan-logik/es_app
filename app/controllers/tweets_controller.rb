class TweetsController < ApplicationController
  respond_to :html, :json

  def show
    @tweet = Tweet.find(params[:id])
    respond_with(@tweet)
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
