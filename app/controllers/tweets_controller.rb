class TweetsController < ApplicationController
  respond_to :html, :json

  def index
    @tweets = Tweet.all(params)
    respond_with(@tweets)
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
