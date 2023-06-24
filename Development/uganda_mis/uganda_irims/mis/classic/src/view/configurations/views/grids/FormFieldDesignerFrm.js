Ext.define('Admin.view.configurations.views.forms.FormFieldDesignerFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'formFieldDesignerFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_formfield_designs',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Label',
        margin: '0 20 20 0',
        name: 'label',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Field Name',
        margin: '0 20 20 0',
        name: 'field_name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Field Type',
        margin: '0 20 20 0',
        name: 'form_field_type_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_form_field_types'
                        }
                    }
                   },
              isLoad: true
            },
            change: function(combo, newVal, oldVal, eopts) {
                var form = combo.up('form'),
                    table = form.down('textfield[name=table]'),
                    displayfield = form.down('textfield[name=displayfield]'),
                    valuefield = form.down('textfield[name=valuefield]');
                if(newVal == 6 || newVal == 7){
                    table.setVisible(true);
                    displayfield.setVisible(true);
                    valuefield.setVisible(true); 
                }else{
                    table.setVisible(false);
                    displayfield.setVisible(false);
                    valuefield.setVisible(false);    
                 
                }
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Table',
        margin: '0 20 20 0',
        name: 'table',
        allowBlank: true,
        hidden: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Display Field',
        margin: '0 20 20 0',
        name: 'displayfield',
        allowBlank: true,
        hidden: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Value Field',
        margin: '0 20 20 0',
        name: 'valuefield',
        allowBlank: true,
        hidden: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_formfield_designs',
                    storeID: 'formDesignerStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});