require 'spec_helper'

describe Tweet do
  subject { Fabricate(:tweet) }

  describe ".search" do
    it "returns a collection of Tweets" do
      described_class.search(nil)    
    end
  end
end
