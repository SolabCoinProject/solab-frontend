import { NextPage } from 'next';
import Container from '../../components/admin/layout/Container';
import { useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { updateActiveSidebarItem } from '../../features/layout/layoutSlice';
import { adminSidebarItemOptions } from '../../features/layout/types';
import RichTextEditor from '../../components/RichTextEditor';
import copy from 'copy-to-clipboard';

const EditorDemo: NextPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveSidebarItem(adminSidebarItemOptions.demoEditor));
    }, []);
    const [editorContent, setEditorContent] = useState<string>('');
    return (
        <Container>
            <div className='p-4'>
                <RichTextEditor
                    value={editorContent}
                    onChange={(content, editor) => {
                        setEditorContent(content);
                    }}
                />
                <button
                    className='btn btn-pink mt-3'
                    onClick={() => {
                        copy(editorContent);
                    }}
                >
                    Copy content
                </button>
            </div>
        </Container>
    );
};

export default EditorDemo;
