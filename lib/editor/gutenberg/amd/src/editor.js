// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Gutenberg editor AMD module.
 *
 * @module     editor_gutenberg/editor
 * @copyright  2026 Aldrin Magno
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define([], function() {
    'use strict';

    return {
        /**
         * Initialise the Gutenberg editor for a given textarea.
         *
         * @param {Object} config Configuration object.
         * @param {string} config.elementId The ID of the textarea to replace.
         * @param {Object} config.options Editor options from Moodle.
         * @param {Object} config.fpoptions File picker options.
         */
        init: function(config) {
            var textarea = document.getElementById(config.elementId);
            if (!textarea) {
                return;
            }
            // Placeholder: Gutenberg block editor will be mounted here.
        }
    };
});
