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

const getUsersByCollege = async (req, res) => {
  const { college_name } = req.query;
  console.log('Received college_name:', college_name); // Debug log

  if (!college_name) {
    return res.status(400).json({ error: 'College name is required in query (e.g., ?college_name=Example College)' });
  }

  try {
    console.log('Querying Supabase for college:', college_name); // Debug log
    const { data: users, error } = await supabase
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
      .ilike('college_name', `%${college_name}%`);

    if (error) {
      console.error('Supabase error:', error); // Debug log
      return res.status(500).json({ error: error.message });
    }

    console.log('Found users:', users?.length || 0); // Debug log

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found for the given college name' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by college:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserById,
  getUsersByCollege
}; 