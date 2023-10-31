import { createElement, Fragment } from "react";
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { justifyLeft, justifyCenter, justifyRight, justifySpaceBetween, justifyStretch, arrowRight, arrowDown } from '@wordpress/icons';
import { Button, ToggleControl, Flex, FlexItem, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { appendSelectors, getBlockGapCSS } from './utils';
import { getGapCSSValue } from '../hooks/gap';
import { BlockControls, JustifyContentControl, BlockVerticalAlignmentControl } from '../components';
import { shouldSkipSerialization } from '../hooks/utils';
import { LAYOUT_DEFINITIONS } from './definitions';

// Used with the default, horizontal flex orientation.
const justifyContentMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  'space-between': 'space-between'
};

// Used with the vertical (column) flex orientation.
const alignItemsMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  stretch: 'stretch'
};
const verticalAlignmentMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
  'space-between': 'space-between'
};
const flexWrapOptions = ['wrap', 'nowrap'];
export default {
  name: 'flex',
  label: __('Flex'),
  inspectorControls: function FlexLayoutInspectorControls({
    layout = {},
    onChange,
    layoutBlockSupport = {}
  }) {
    const {
      allowOrientation = true
    } = layoutBlockSupport;
    return createElement(Fragment, null, createElement(Flex, null, createElement(FlexItem, null, createElement(FlexLayoutJustifyContentControl, {
      layout: layout,
      onChange: onChange
    })), createElement(FlexItem, null, allowOrientation && createElement(OrientationControl, {
      layout: layout,
      onChange: onChange
    }))), createElement(FlexWrapControl, {
      layout: layout,
      onChange: onChange
    }));
  },
  toolBarControls: function FlexLayoutToolbarControls({
    layout = {},
    onChange,
    layoutBlockSupport
  }) {
    if (layoutBlockSupport?.allowSwitching) {
      return null;
    }
    const {
      allowVerticalAlignment = true
    } = layoutBlockSupport;
    return createElement(BlockControls, {
      group: "block",
      __experimentalShareWithChildBlocks: true
    }, createElement(FlexLayoutJustifyContentControl, {
      layout: layout,
      onChange: onChange,
      isToolbar: true
    }), allowVerticalAlignment && createElement(FlexLayoutVerticalAlignmentControl, {
      layout: layout,
      onChange: onChange,
      isToolbar: true
    }));
  },
  getLayoutStyle: function getLayoutStyle({
    selector,
    layout,
    style,
    blockName,
    hasBlockGapSupport,
    layoutDefinitions = LAYOUT_DEFINITIONS
  }) {
    const {
      orientation = 'horizontal'
    } = layout;

    // If a block's block.json skips serialization for spacing or spacing.blockGap,
    // don't apply the user-defined value to the styles.
    const blockGapValue = style?.spacing?.blockGap && !shouldSkipSerialization(blockName, 'spacing', 'blockGap') ? getGapCSSValue(style?.spacing?.blockGap, '0.5em') : undefined;
    const justifyContent = justifyContentMap[layout.justifyContent];
    const flexWrap = flexWrapOptions.includes(layout.flexWrap) ? layout.flexWrap : 'wrap';
    const verticalAlignment = verticalAlignmentMap[layout.verticalAlignment];
    const alignItems = alignItemsMap[layout.justifyContent] || alignItemsMap.left;
    let output = '';
    const rules = [];
    if (flexWrap && flexWrap !== 'wrap') {
      rules.push(`flex-wrap: ${flexWrap}`);
    }
    if (orientation === 'horizontal') {
      if (verticalAlignment) {
        rules.push(`align-items: ${verticalAlignment}`);
      }
      if (justifyContent) {
        rules.push(`justify-content: ${justifyContent}`);
      }
    } else {
      if (verticalAlignment) {
        rules.push(`justify-content: ${verticalAlignment}`);
      }
      rules.push('flex-direction: column');
      rules.push(`align-items: ${alignItems}`);
    }
    if (rules.length) {
      output = `${appendSelectors(selector)} {
				${rules.join('; ')};
			}`;
    }

    // Output blockGap styles based on rules contained in layout definitions in theme.json.
    if (hasBlockGapSupport && blockGapValue) {
      output += getBlockGapCSS(selector, layoutDefinitions, 'flex', blockGapValue);
    }
    return output;
  },
  getOrientation(layout) {
    const {
      orientation = 'horizontal'
    } = layout;
    return orientation;
  },
  getAlignments() {
    return [];
  }
};
function FlexLayoutVerticalAlignmentControl({
  layout,
  onChange,
  isToolbar = false
}) {
  const {
    orientation = 'horizontal'
  } = layout;
  const defaultVerticalAlignment = orientation === 'horizontal' ? verticalAlignmentMap.center : verticalAlignmentMap.top;
  const {
    verticalAlignment = defaultVerticalAlignment
  } = layout;
  const onVerticalAlignmentChange = value => {
    onChange({
      ...layout,
      verticalAlignment: value
    });
  };
  if (isToolbar) {
    return createElement(BlockVerticalAlignmentControl, {
      onChange: onVerticalAlignmentChange,
      value: verticalAlignment,
      controls: orientation === 'horizontal' ? ['top', 'center', 'bottom', 'stretch'] : ['top', 'center', 'bottom', 'space-between']
    });
  }
  const verticalAlignmentOptions = [{
    value: 'flex-start',
    label: __('Align items top')
  }, {
    value: 'center',
    label: __('Align items center')
  }, {
    value: 'flex-end',
    label: __('Align items bottom')
  }];
  return createElement("fieldset", {
    className: "block-editor-hooks__flex-layout-vertical-alignment-control"
  }, createElement("legend", null, __('Vertical alignment')), createElement("div", null, verticalAlignmentOptions.map((value, icon, label) => {
    return createElement(Button, {
      key: value,
      label: label,
      icon: icon,
      isPressed: verticalAlignment === value,
      onClick: () => onVerticalAlignmentChange(value)
    });
  })));
}
const POPOVER_PROPS = {
  placement: 'bottom-start'
};
function FlexLayoutJustifyContentControl({
  layout,
  onChange,
  isToolbar = false
}) {
  const {
    justifyContent = 'left',
    orientation = 'horizontal'
  } = layout;
  const onJustificationChange = value => {
    onChange({
      ...layout,
      justifyContent: value
    });
  };
  const allowedControls = ['left', 'center', 'right'];
  if (orientation === 'horizontal') {
    allowedControls.push('space-between');
  } else {
    allowedControls.push('stretch');
  }
  if (isToolbar) {
    return createElement(JustifyContentControl, {
      allowedControls: allowedControls,
      value: justifyContent,
      onChange: onJustificationChange,
      popoverProps: POPOVER_PROPS
    });
  }
  const justificationOptions = [{
    value: 'left',
    icon: justifyLeft,
    label: __('Justify items left')
  }, {
    value: 'center',
    icon: justifyCenter,
    label: __('Justify items center')
  }, {
    value: 'right',
    icon: justifyRight,
    label: __('Justify items right')
  }];
  if (orientation === 'horizontal') {
    justificationOptions.push({
      value: 'space-between',
      icon: justifySpaceBetween,
      label: __('Space between items')
    });
  } else {
    justificationOptions.push({
      value: 'stretch',
      icon: justifyStretch,
      label: __('Stretch items')
    });
  }
  return createElement(ToggleGroupControl, {
    __nextHasNoMarginBottom: true,
    label: __('Justification'),
    value: justifyContent,
    onChange: onJustificationChange,
    className: "block-editor-hooks__flex-layout-justification-controls"
  }, justificationOptions.map(({
    value,
    icon,
    label
  }) => {
    return createElement(ToggleGroupControlOptionIcon, {
      key: value,
      value: value,
      icon: icon,
      label: label
    });
  }));
}
function FlexWrapControl({
  layout,
  onChange
}) {
  const {
    flexWrap = 'wrap'
  } = layout;
  return createElement(ToggleControl, {
    __nextHasNoMarginBottom: true,
    label: __('Allow to wrap to multiple lines'),
    onChange: value => {
      onChange({
        ...layout,
        flexWrap: value ? 'wrap' : 'nowrap'
      });
    },
    checked: flexWrap === 'wrap'
  });
}
function OrientationControl({
  layout,
  onChange
}) {
  const {
    orientation = 'horizontal',
    verticalAlignment,
    justifyContent
  } = layout;
  return createElement(ToggleGroupControl, {
    __nextHasNoMarginBottom: true,
    className: "block-editor-hooks__flex-layout-orientation-controls",
    label: __('Orientation'),
    value: orientation,
    onChange: value => {
      // Make sure the vertical alignment and justification are compatible with the new orientation.
      let newVerticalAlignment = verticalAlignment;
      let newJustification = justifyContent;
      if (value === 'horizontal') {
        if (verticalAlignment === 'space-between') {
          newVerticalAlignment = 'center';
        }
        if (justifyContent === 'stretch') {
          newJustification = 'left';
        }
      } else {
        if (verticalAlignment === 'stretch') {
          newVerticalAlignment = 'top';
        }
        if (justifyContent === 'space-between') {
          newJustification = 'left';
        }
      }
      return onChange({
        ...layout,
        orientation: value,
        verticalAlignment: newVerticalAlignment,
        justifyContent: newJustification
      });
    }
  }, createElement(ToggleGroupControlOptionIcon, {
    icon: arrowRight,
    value: 'horizontal',
    label: __('Horizontal')
  }), createElement(ToggleGroupControlOptionIcon, {
    icon: arrowDown,
    value: 'vertical',
    label: __('Vertical')
  }));
}
const layoutTypes = [flow, flex, constrained, grid];
function getLayoutType(name = 'default') {
  return layoutTypes.find(layoutType => layoutType.name === name);
}
//# sourceMappingURL=index.js.map