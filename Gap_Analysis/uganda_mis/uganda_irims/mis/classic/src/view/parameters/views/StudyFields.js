Ext.define('Admin.view.parameters.StudyFields', {
    extend: 'Ext.panel.Panel',
    xtype: 'studyfields',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'studyfieldsgrid',
            addBtnText: 'Add Study Field',
            store: 'studyfieldsstr',
            form: 'studyfieldfrm',
            emptyText: 'No Study Field Available'
        }
    ]
});