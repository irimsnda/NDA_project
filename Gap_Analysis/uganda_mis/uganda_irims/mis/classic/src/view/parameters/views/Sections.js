Ext.define('Admin.view.parameters.Sections', {
    extend: 'Ext.panel.Panel',
    xtype: 'sections',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'sectionsgrid',
            addBtnText: 'Add Section',
            store: 'sectionsstr',
            form: 'sectionfrm',
            emptyText: 'No Section Available'
        }
    ]
});