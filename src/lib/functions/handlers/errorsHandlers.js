const handleErrors = (status, code, errors) => {
    return {
        status,
        body: {
            pass: false,
            code,
            errors
        }
    }
}

export const handleSchemaErrors = (schema) => {
    let errors = [];
    schema.error.issues.forEach(issue => {
        errors.push({
            message: issue.message,
            path: issue.path
        });
    })
    return handleErrors(400, 'INVALID_SCHEMA', errors);
}