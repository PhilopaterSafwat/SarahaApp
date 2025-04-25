import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // إضافة القواعد الخاصة بك هنا
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",  // تحذير عند استخدام "any"
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],  // تحذير للمتغيرات غير المستخدمة
    },
  },
];

export default eslintConfig;
