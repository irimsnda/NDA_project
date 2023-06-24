

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.forms.ParDisposalInternalSupervisorsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pardisposalinternalsupervisorsfrm',
    itemId: 'pardisposalinternalsupervisorsfrm',
    layout: {
        type: 'column',
        columns: 1
    },
    bodyPadding: 5,
    controller: 'disposalpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 1,
        labelAlign: 'top',
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_disposal_inspectors'
    },{
        xtype: 'panel',
        layout:{
            type: 'column',
            columns: 2
        },
        items:[{
            xtype: 'combo',
            fieldLabel: 'Supervisor Title',
            labelWidth: 80,
            labelAlign: 'top',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'inspectors_title_id',
            queryMode: 'local',
            columnWidth: 0.9,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'disposal_inspectorstitlestrs',
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_disposal_inspectors_titles',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-purple',
            form: 'parametereAddFrm',
            text: 'Supervisor Title',
            title: 'Supervisor Title',
            iconCls: 'fa fa-plus',
            store_name: 'disposal_inspectorstitlestrs',
            table_name: 'par_disposal_inspectors_titles', 
            handler: 'showAddFormWin'
        }]
    },{
        xtype: 'combo',
        fieldLabel: 'Supervisor',
        labelWidth: 80,
        labelAlign: 'top',
        valueField: 'fullnames',
        displayField: 'fullnames',
        forceSelection: true,
        name: 'inspector_name',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'usermanagement/getActiveSystemUsers',
                        
                    }
                },
                isLoad: true
            }
        }
    }],
    buttons:[{
        text: 'Save Supervisor',
        iconCls: 'x-fa fa-plus',
        margin:5,
        store: '',
        name: 'savesupervisors'
    }]
   
});