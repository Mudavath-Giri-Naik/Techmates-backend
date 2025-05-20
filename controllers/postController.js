const supabase = require('../supabase');

// GET /posts?type=event
const getPostsByType = async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Post type is required in query (e.g., ?type=event)' });
  }

  try {
    // First get the posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select(`
        id,
        user_id,
        type,
        title,
        description,
        images,
        created_at,
        updated_at,
        likes_count,
        comments_count,
        shares_count,
        start_date,
        end_date,
        company,
        role,
        requirements,
        location,
        salary,
        application_link,
        venue,
        organizer,
        registration_link,
        max_participants,
        prize,
        rules,
        theme,
        technologies,
        category,
        achievement_date,
        achievement_link
      `)
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (postsError) {
      return res.status(500).json({ error: postsError.message });
    }

    // Get user information for each post
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        const { data: userData, error: userError } = await supabase
          .from('Users')
          .select(`
            id,
            username,
            avatar_url,
            email_id,
            college_name,
            course_name,
            leetcode_link,
            github_link,
            linkedin_link,
            instagram_link
          `)
          .eq('id', post.user_id)
          .single();

        // Get likes count
        const { count: likesCount, error: likesError } = await supabase
          .from('likes')
          .select('*', { count: 'exact' })
          .eq('post_id', post.id);

        // Get comments count
        const { count: commentsCount, error: commentsError } = await supabase
          .from('comments')
          .select('*', { count: 'exact' })
          .eq('post_id', post.id);

        return {
          ...post,
          user: userError ? null : userData,
          likes_count: likesError ? 0 : likesCount,
          comments_count: commentsError ? 0 : commentsCount
        };
      })
    );

    res.status(200).json(postsWithUsers);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getPostsByType
};
