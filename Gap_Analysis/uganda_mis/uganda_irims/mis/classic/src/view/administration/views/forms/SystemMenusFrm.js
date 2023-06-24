/**
 * Created by Kip on 7/5/2018.
 */
Ext.define('Admin.view.administration.views.forms.SystemMenusFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'systemmenusfrm',
    autoScroll: true,
    requires:[
        'Ext.layout.container.Table'
    ],
    controller: 'administrationvctr',
    bodyPadding: 3,
    layout:{
        type: 'column'
    },
    defaults: {
        //layout: '',
        labelAlign: 'top',
        allowBlank: false,
        columnWidth:0.25,
        margin: 8
    },
    itemId: 'systemmenusfrmId',
    /*listeners:{
      beforerender: function(){
          var id=this.down('hiddenfield[name=id]').getValue();
          if(!id){
              alert('no id')
              this.down('combo[name=parent_id]').setVisible(false);
              this.down('combo[name=child_id]').setVisible(false);
          }
      }
    },*/
    items: [{
        xtype: 'hiddenfield',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_menus',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name/Text',
        name: 'name'
       // margin: '0 20 0 0'
    }, {
        xtype: 'textfield',
        fieldLabel: 'ViewType',
        name: 'viewType',
        allowBlank: true
        //margin: '0 0 0 20'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Route ID',
        name: 'routeId',
        allowBlank: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'IconCls',
        name: 'iconCls',
        allowBlank: true
    }, {
        xtype: 'combo',
        fieldLabel: 'Level',
        displayField: 'name',
        valueField: 'id',
        store: 'menulevelsstr',
        queryMode: 'local',
        forceSelection: true,
        name: 'level',
        listeners: {
            change: 'showHideParent'
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Parent',
        hidden: true,
        displayField: 'name',
        valueField: 'id',
        allowBlank: true,
        forceSelection: true,
        name: 'parent_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 100,
                    storeId: 'parentmenusstr',
                    proxy: {
                        url: 'administration/getParentMenus'
                    }
                },
                isLoad:true
            },
            change: 'filterChildMenus'
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Parent',
        displayField: 'name',
        valueField: 'id',
        allowBlank: true,
        name: 'child_id',
        forceSelection: true,
        hidden: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 100,
                    storeId: 'childmenusstr',
                    proxy: {
                        url: 'administration/getChildMenus'
                    }
                },
                isLoad: false
            }
        }
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Order No.',
        name: 'order_no'
    }, {
        xtype: 'combo',
        fieldLabel: 'Is Menu?',
        displayField: 'name',
        valueField: 'flag',
        store: 'confirmationstr',
        queryMode: 'local',
        forceSelection: true,
        name: 'is_menu',
        value: 1
    }, {
        xtype: 'combo',
        fieldLabel: 'Is Disabled?',
        store: 'confirmationstr',
        queryMode: 'local',
        forceSelection: true,
        displayField: 'name',
        valueField: 'flag',
        name: 'is_disabled',
        value: 0
    },
    , {
        xtype: 'combo',
        fieldLabel: 'Navigation Type',
        displayField: 'name',
        valueField: 'id',
        allowBlank: true,
        name: 'menu_type_id',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_menu_types'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal){
                if(newVal == 2){
                    var form = combo.up('form'),
                        parametercb = form.down('combo[name=parameter_id]');
                    parametercb.setVisible(true);
                }
                
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Parameter',
        displayField: 'param_name',
        valueField: 'id',
        allowBlank: true,
        name: 'parameter_id',
        forceSelection: true,
        hidden: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_parameter_definations'
                        }
                    }
                },
                isLoad: true
            }
        }
    }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    containerType: 'form',
                    containerPnlID: 'SystemMenusDashboard',
                    containerPnlXtype: 'systemmenuspnl',
                    hiddenCompXtype: 'systemmenusgrid',
                    ui: 'soft-purple',
                    handler: 'adminBackToDashboard'
                },'->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'menus',
                    storeID: 'systemmenusstr',
                    containerPnlID: 'SystemMenusDashboard',
                    containerPnlXtype: 'systemmenuspnl',
                    hiddenCompXtype: 'systemmenusgrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'administration/saveMenuItem',
                    handler: 'saveMenuItem'
                }, {
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});