/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.ApplicationPermitsDeclarationsDash', {
    extend: 'Ext.Container',
    xtype: 'applicationpermitsdeclarationsdash',
    layout: 'border',
    items: [
        {
           xtype:'tabpanel',
           layout:'fit', 
           region: 'center',
           items:[{
				xtype: 'declaredimportexportpermitsdashgrid',
				title: 'Active Permits Declarations Tasks',
				margin: 2
           },{
                xtype: 'applicationpermitsdeclarationsdashgrid',
                title: 'Declared Import/Export Permits ',
                margin: 2
           }]
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        },{
			xtype:'hiddenfield',
			name:'section_id',
			value:''
		}
    ]
});