import { useLoginForm } from '../hooks';

import { Input } from '../components';

const LogIn = () => {
    const {
        formData,
        errors,
        handleChange,
        handleSubmit
    } = useLoginForm();

    const fields = [
        {
            id: 1,
            name: 'User Name',
            inputName: 'name',
            value: formData.name,
            type: 'text',
            error: errors.name
        },
        {
            id: 2,
            name: 'Password',
            inputName: 'password',
            value: formData.password,
            type: 'password',
            error: errors.password
        },
    ];

    return (
        <section className="single-column-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                {fields.map(field => (
                    <Input key={field.id} {...field} handleChange={handleChange} />
                ))}
                <p className="login-info">for admin permissions please contact me via <a href="mailto:obrm770@gmail.com">email</a>.</p>
                <button className="btn update-btn" type="submit">Log In</button>
            </form>
        </section>
    )
}

export default LogIn