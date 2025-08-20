// CardIconProps类型
export interface CardIconProps {
  iconName?: string;  // 使用SvgIcon组件时的图标名称
  iconPath?: string;  // 兼容旧版本，使用img标签时的图标路径
  alt: string;
  text_title: string;
  text_content?: string;
}
