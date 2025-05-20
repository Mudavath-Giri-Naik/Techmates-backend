const supabase = require('../supabase');

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: user, error } = await supabase
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
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserById
}; 