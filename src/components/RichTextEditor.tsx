import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { tinyEmcApikey } from '../config/app';

interface Props {
    value: string;
    onChange: (content: string, editor: any) => void;
}

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
    return (
        <Editor
            apiKey={tinyEmcApikey}
            init={{
                plugins:
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                imagetools_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                height: 600,
                image_caption: true,
                quickbars_selection_toolbar:
                    'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link table',
                fontsize_formats:
                    '8px 9px 10px 11px 12px 14px 16px 18px 24px 30px 32px 36px 48px 60px 72px 96px',
                content_style:
                    "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); body {  font-family: 'Roboto', sans-serif; font-size:16px; background-color: #091125; color: #E2E4E9; font-weight: 400 };",
            }}
            onEditorChange={onChange}
            value={value}
        />
    );
};

export default RichTextEditor;
