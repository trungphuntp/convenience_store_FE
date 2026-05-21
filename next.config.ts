import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "antd",
    "@ant-design/icons",
    "@ant-design/cssinjs",
    "@ant-design/nextjs-registry",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
    "rc-input",
    "rc-field-form",
    "rc-select",
    "rc-cascader",
    "rc-checkbox",
    "rc-radio",
    "rc-mentions",
    "rc-slider",
    "rc-rate",
    "rc-switch",
    "rc-upload",
    "rc-overflow",
  ],
};

export default nextConfig;
