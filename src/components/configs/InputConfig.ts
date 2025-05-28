const inputConfigs = [
    {
      label: "Email",
      type: "text",
      register: {
        ...register("email", {
          required: !isAnon ? "Email is required" : false,
        }),
      },
      error: errors.email?.message ?? null,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e),
    },
    {
      label: "Password",
      type: "password",
      register: {
        ...register("password", {
          required: !isAnon ? "Password is required" : false,
        }),
      },
      error: errors.password?.message ?? null,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e),
    },
  ];