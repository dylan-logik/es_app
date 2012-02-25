class TweetFacets
  class << self
    def hash_tag_facet
      Proc.new do
        facet 'hashtag.text' do
          terms :'hashtag.text'
        end
      end
    end

    def user_facet
      Proc.new do
        facet 'user.name' do
          terms :'user.name'
        end
      end
    end

    def retweet_facet
      Proc.new do
        facet 'retweet_count' do
          terms :retweet_count 
        end
      end
    end
=begin
    def retweet_facet
      Proc.new do
        facet 'retweet_count' do
          range :retweet_count, [
            { to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4 }
          ]
        end
      end
    end
=end
    def facets
      self.methods.select { |m| m =~ /.*_facet$/ }.each do |f|
        yield self.send(f)
      end
    end
  end
end
