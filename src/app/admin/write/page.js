'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        summary: '',
        content: '',
        category: 'Tech',
        read_time: 5,
        is_featured: false
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (file) {
            data.append('image_file', file);
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                body: data
            });

            if (res.ok) {
                alert('Post created successfully!');
                router.push('/');
                router.refresh();
            } else {
                const error = await res.text();
                alert('Error creating post: ' + error);
            }
        } catch (err) {
            alert('Error creating post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h1>Write New Article</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={generateSlug}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Slug (URL)</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Summary</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label>Content (HTML supported)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={10}
                        required
                        className="content-editor"
                    />
                    <p className="hint">Tip: Use &lt;h2&gt;, &lt;p&gt; tags for formatting.</p>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Tech">Tech</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="News">News</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Read Time (min)</label>
                        <input type="number" name="read_time" value={formData.read_time} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Featured Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <p className="hint">Upload from computer</p>
                </div>

                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                        />
                        Feature this post?
                    </label>
                </div>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Article'}
                </button>
            </form>


        </div>
    );
}
