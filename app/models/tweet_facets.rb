class TweetFacets
  class << self
    def hash_tag_facet
      Proc.new do
        facet 'hash_tag_facet' do
          terms :'hashtag.text'
        end
      end
    end

    def user_facet
      Proc.new do
        facet 'user_facet' do
          terms :'user.name'
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
