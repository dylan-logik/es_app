module TweetFacets

  def tag_facet
    Proc.new do
      facet 'tags.untouched' do
        terms 'tags.untouched'
      end
    end
  end

  def hash_tag_facet
    Proc.new do
      facet 'hashtag.text' do
        terms :'hashtag.text'
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
          { from: 0, to: 1 },
          { from: 2, to: 5 },
          { from: 6, to: 9 },
          { from: 10, to: 19 },
          { from: 20, to: 29 },
          { from: 30, to: 49 },
          { from: 50, to: 69 },
          { from: 70, to: 89 },
          { from: 90, to: 99 },
          { from: 100 }
        ]
      end
    end
  end

  def mention_facet
    Proc.new do
      facet 'mention.screen_name' do
        terms :'mention.screen_name'
      end
    end
  end

  def place_facet
    Proc.new do
      facet 'place.country.untouched' do
        terms :'place.country.untouched'
      end
    end
  end
  
  def date_range_facet
    Proc.new do
      facet 'created_at' do
        date :'created_at', { interval: 'minute' }
      end
    end
  end

  def retweet_stats_facet
    Proc.new do
      facet 'retweet_count_stats' do
        statistical :'retweet_count'
      end
    end
  end

  def facets
    self.methods.select { |m| m =~ /.*_facet$/ }.each do |f|
      yield self.send(f)
    end
  end
end
