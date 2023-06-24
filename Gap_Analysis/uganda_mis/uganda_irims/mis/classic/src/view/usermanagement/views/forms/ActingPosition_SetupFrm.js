/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.forms.ActingPosition_SetupFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'actingposition_setupfrm',
    autoScroll: true,
    controller: 'usermanagementvctr',
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_actingposition_management',
        allowBlank: true
    },{xtype:'hiddenfield', name:'id'}, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'User',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'user_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'usermanagement/getUserList'
                    }
                },
                isLoad: true
            }
        }
    },  {
        xtype: 'combo',
        fieldLabel: 'Acting User For',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'actingfor_user_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'usermanagement/getUserList'
                    }
                },
                isLoad: true
            },
            change: function (cmb, newVal,oldvalue,eopts) {
                var form = cmb.up('form'),
                groupStr = form.down('combo[name=group_id]').getStore();
                groupStr.removeAll();
                groupStr.load({
                    params:{
                        user_id:newVal
                    }
                })
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Acting For Group',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'group_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getUserGroupsdetails',
                        extraParams: {
                            table_name: 'par'
                        }
                    }
                },
                isLoad: false
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Reason',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'acting_reason_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_acting_reasons'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype:'datefield',
        name:'acting_date_from',
        format:'Y-m-d',
        fieldLabel: 'Acting From',
        allowBlank: false
    },{
        xtype:'datefield',
        name:'acting_date_to', 
        format:'Y-m-d',
        fieldLabel: 'Acting To',
        allowBlank: false
    }, {
        xtype: 'combo',
        fieldLabel: 'Requested By',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'requested_by_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'usermanagement/getUserList'
                    }
                },
                isLoad: true
            },
            change: function (cmb, newVal,oldvalue,eopts) {
                
            }
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Remarks',
        margin: '0 20 20 0',
        name: 'remarks'
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_actingposition_management',
                    storeID: 'actingposition_setupgridstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }, 
            ]
        }
    ]
});