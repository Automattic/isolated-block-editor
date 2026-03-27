<?php
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
 * Gutenberg editor integration.
 *
 * @package    editor_gutenberg
 * @copyright  2026 Aldrin Magno
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace editor_gutenberg;

defined('MOODLE_INTERNAL') || die();

/**
 * Gutenberg editor class.
 *
 * Integrates the Automattic Isolated Block Editor (Gutenberg)
 * as a text editor within Moodle.
 *
 * @package    editor_gutenberg
 * @copyright  2026 Aldrin Magno
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class editor extends \texteditor {

    /**
     * Is the current browser supported by this editor?
     *
     * @return bool
     */
    public function supported_by_browser(): bool {
        return true;
    }

    /**
     * Returns array of supported text formats.
     *
     * @return array
     */
    public function get_supported_formats(): array {
        return [FORMAT_HTML => FORMAT_HTML];
    }

    /**
     * Returns the preferred text format.
     *
     * @return int
     */
    public function get_preferred_format(): int {
        return FORMAT_HTML;
    }

    /**
     * Does this editor support picking from repositories?
     *
     * @return bool
     */
    public function supports_repositories(): bool {
        return true;
    }

    /**
     * Add required JS and CSS for the editor to the page.
     *
     * @param string $elementid The ID of the textarea element.
     * @param array|null $options Editor options.
     * @param array|null $fpoptions File picker options.
     */
    public function use_editor($elementid, array $options = null, $fpoptions = null) {
        global $PAGE;

        $jsoptions = json_encode([
            'elementId' => $elementid,
            'options' => $options,
            'fpoptions' => $fpoptions,
        ]);

        $PAGE->requires->js_amd_inline("
            require(['editor_gutenberg/editor'], function(GutenbergEditor) {
                GutenbergEditor.init({$jsoptions});
            });
        ");
    }
}
