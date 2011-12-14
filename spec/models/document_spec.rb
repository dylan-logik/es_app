require 'spec_helper'

describe Document do
  [:search].each do |meth|
    it "responds to #{meth}" do
      Document.respond_to?(meth).should be_true
    end
  end
end
