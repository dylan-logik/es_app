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
          terms :'user.name.untouched'
        end
      end
    end

    def retweet_facet
      Proc.new do
        facet 'retweet_count' do
          range :retweet_count, [
            { to: 1 },
            { from: 2, to: 5 },
            { from: 6, to: 15 },
            { from: 16, to: 25 },
            { from: 26 }
          ]
        end
      end
    end

    def facets
      self.methods.select { |m| m =~ /.*_facet$/ }.each do |f|
        yield self.send(f)
      end
    end
  end
end
