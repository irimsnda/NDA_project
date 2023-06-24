

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.forms.DisposalDestructionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'disposaldestructionfrm',
    itemId: 'disposaldestructionfrm',
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    controller: 'disposalpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.49,
        labelAlign: 'top',
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_disposal_applications'
    },{
        xtype: 'datefield',
        fieldLabel:'Destruction Exercise Start Date',
        allowBlank: false,
        format: 'Y-m-d', altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        name: 'destruction_startdate',
        bind: {
            readOnly: '{isReadOnly}'
        }

    } ,{
        xtype: 'datefield',
        fieldLabel:'Destruction Exercise End Date',
        allowBlank: false,
        format: 'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        name: 'destruction_enddate',
        bind: {
            readOnly: '{isReadOnly}'
        }
    } , {
            xtype: 'panel',
            layout:{
                type: 'column',
                columns: 2
            },
            items:[{
                xtype: 'tagfield',
                fieldLabel: 'Destruction Exercise Sites',
                margin: '0 20 20 0',
                name: 'destruction_exercise_sites',
                allowBlank: false,
                columnWidth: 0.95,
                forceSelection: true,
                filterPickList: true,
                encodeSubmitValue: true,
                labelAlign: 'top',
                emptyText: 'Select Destruction Exercise Sites',
                growMax: 100,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosSectionfilterStore',
                        config: {
                            pageSize: 10000,
                            storeId: 'disposaldestruction_sitesstr',
                            proxy: {
                                url: 'configurations/getNonrefParameter',
                                extraParams: {
                                    table_name: 'par_disposaldestruction_sites',
                                    has_filter: 0
                                }
                            }
                        },
                        isLoad: true
                    }
                },bind: {
                    readOnly: '{isReadOnly}'
                }
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                ui: 'soft-purple',
                form: 'parametereAddFrm',
                text: 'New Destruction Sites',
                title: 'New Destruction Sites',
                iconCls: 'fa fa-plus',
                store_name: 'disposaldestruction_sitesstr',
                table_name: 'par_disposaldestruction_sites', 
                handler: 'showAddFormWin',bind: {
                    disabled: '{isReadOnly}'
                }
            }]
    },{
        xtype: 'panel',
        layout:{
            type: 'column',
            columns: 2
        },//
        items:[{
            xtype: 'tagfield',
            fieldLabel: 'Methods of Destruction',
            margin: '0 20 20 0',
            name: 'methodsof_destructions',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            columnWidth: 0.95,
            labelAlign: 'top',
            encodeSubmitValue: true,
            emptyText: 'Select Methods of Destruction',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'destruction_methodsstr',
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_destruction_methods',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            },bind: {
                readOnly: '{isReadOnly}'
            }
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-purple',
            form: 'parametereAddFrm',
            text: 'New Methods of Destruction', title: 'New Methods of Destruction',
            iconCls: 'fa fa-plus',
            store_name: 'destruction_methodsstr',
            table_name: 'par_destruction_methods', 
            handler: 'showAddFormWin',
            bind: {
                disabled: '{isReadOnly}'
            }
        }]
    },{
        xtype: 'combo',
        fieldLabel: 'Destruction Recommendation',
        labelWidth: 80,
       
        columnWidth: 0.33,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'disposal_verrecomendation_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_disposal_verrecomendations',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        }
    },{
            xtype: 'textarea',
            name: 'destruction_remarks',
            columnWidth: 1,
            allowBlank: false,
            fieldLabel:'Destruction Exercise Remarks',
            bind: {
                readOnly: '{isReadOnly}'
            }

    }]
   
});