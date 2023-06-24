Ext.define('Admin.view.managementdashboard.views.forms.ManagementDashboardFilterFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'managementdashboardfilterFrm',
    autoScroll: true,
    requires:[
        'Ext.layout.container.Table'
    ],
    controller: 'managementdashboardVctr',
    bodyPadding: 3,
    width: '100%',
    layout:{
        type: 'column'
    },
    defaults: {
        //layout: '',
        labelAlign: 'left',
        allowBlank: false,
        columnWidth:0.2,
        margin: 8
    },
    items: [{
        xtype: 'combo',
        fieldLabel: 'Section',
        displayField: 'name',
        valueField: 'id',
        allowBlank: false,
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
        listeners: {
					afterrender: {
							fn: 'setConfigCombosStore',
							config: {
								pageSize: 10000,
								proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_sections'
                                }
                               }
							},
							isLoad: true
						}
		}
    }, {
        xtype: 'combo',
        fieldLabel: 'Zones',
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        allowBlank: false,
        forceSelection: true,
        name: 'zone_id',
		listeners: {
					afterrender: {
							fn: 'setConfigCombosStore',
							config: {
								pageSize: 10000,
								proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_zones'
                                }
                               }
							},
							isLoad: true
						}
		}
    }, {
        xtype: 'datefield',
        fieldLabel: 'Date From',
        name: 'from_date',
        allowBlank: false
    }, {
        xtype: 'datefield',
        fieldLabel: 'Date To',
        name: 'to_date',
        allowBlank: false
    },{
        xtype: 'button',
        text: 'Search',
        iconCls: 'fa fa-filter',
        formBind: true,
        handler: 'func_filterdasboard'
    }]
});