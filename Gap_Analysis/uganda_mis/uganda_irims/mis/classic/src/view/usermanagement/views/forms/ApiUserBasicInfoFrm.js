
Ext.define('Admin.view.usermanagement.views.forms.ApiUserBasicInfoFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.apiuserbasicinfofrm',
    bodyPadding: 8,
    controller: 'usermanagementvctr',
    autoScroll: true,
    /*layout:{
        type: 'vbox'
    },*/
    items: [
         {
            xtype: 'container',
            layout: 'column',
            defaults: {
                labelAlign: 'top',
                labelStyle: {
                    'font-weight': 'bold'
                },
                allowBlank: true
            },
            fieldDefaults: {
                xtype: 'textfield',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                }
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'id',
                    columnWidth: 0.25,
                    margin: '0 20 20 0',
                    name: 'id'
                }, {
                    xtype: 'textfield',
                    value: token,
                    name: '_token',
                    hidden: true
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'table name',
                    value: 'users',
                    margin: '0 20 20 0',
                    name: 'table_name'
                }, {
                    xtype: 'hiddenfield',
                    value: 'apiuser_category_id',
                    name: 'skip'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Email Address',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'email',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    allowBlank: false,
                    vtype: 'email',
                    enableKeyEvents: true,
                    listeners: {
                        change: 'updateModelApiUserEmailOnChange'
                    }
                    //bind: '{email}'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Phone No',
                    allowBlank: true,
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'phone',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Mobile No',
                    allowBlank: true,
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'mobile',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Api Category',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'apiuser_category_id',
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
                                    pageSize: 100,
                                    proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_apiuser_categories'
                                    }
                                   }
                                },
                                isLoad: true
                            },
                        // change: function (cmb, newVal) {
                        //     var form = cmb.up('form'),
                        //         wizard=form.up('apiuserswizardfrm'),
                        //         dragGroupStore=wizard.down('draggroupgrid').getStore();
                        //     dragGroupStore.removeAll();
                        //     dragGroupStore.load();
                        // }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Password',
                    inputType: 'password', 
                    allowBlank: true,
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    id: 'new_password',
                    name: 'new_password',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    }
                },
                 {
                    xtype: 'textfield',
                    fieldLabel: 'Confirm New Password',
                    inputType: 'password',
                    id: 'confirm_new_password',
                    initialPassField: 'new_password',
                    vtype: 'password',
                    columnWidth: 0.25,
                    name: 'confirm_new_password'
              }
            ]
        }
    ]
});