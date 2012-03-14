class TweetFacets
  class << self
    def hash_tag_facet
      Proc.new do
        facet 'hashtag.text.untouched' do
          terms :'hashtag.text.untouched'
        end
      end
    end

    def user_facet
      Proc.new do
        facet 'user.name.untouched' do
          terms :'user.name.untouched'
        end
      end
    end

    def retweet_facet
      Proc.new do
        facet 'retweet_count' do
          range :retweet_count, [
            { to: 1 },
            { from: 2, to: 10 },
            { from: 11, to: 20 },
            { from: 21, to: 30 },
            { from: 31, to: 40 },
            { from: 41, to: 50 },
            { from: 50 }
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
