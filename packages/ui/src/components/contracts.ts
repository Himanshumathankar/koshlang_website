export type ComponentSize = "sm" | "md" | "lg";
export type ComponentTone = "neutral" | "primary" | "success" | "warning" | "danger";

export type ButtonDefinition = {
  component: "Button";
  size: ComponentSize;
  tone: ComponentTone;
  requiresAccessibleName: true;
};

export type DisclosureDefinition = {
  component: "Dialog" | "Drawer" | "Popover" | "Dropdown";
  requiresFocusManagement: true;
  requiresEscapeClose: true;
  requiresReturnFocus: true;
};

export const componentContracts = {
  button: {
    component: "Button",
    size: "md",
    tone: "primary",
    requiresAccessibleName: true
  },
  drawer: {
    component: "Drawer",
    requiresFocusManagement: true,
    requiresEscapeClose: true,
    requiresReturnFocus: true
  }
} satisfies Record<string, ButtonDefinition | DisclosureDefinition>;
