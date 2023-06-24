/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.EvaluationTemplateFrm', {
    extend: 'Ext.form.Panel',
    frame: true,
    xtype: 'evaluationtemplatefrm',
    controller: 'premiseregistrationvctr',
    layout: 'form',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'evaluation_templates'
        },
        {
            xtype: 'htmleditor',
            name: 'template',
            allowBlank: false
        }
    ],
    buttons: [
        {
            text: 'Save Template',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'saveEvaluationTemplate',
            table_name: 'evaluation_templates',
            action_url: 'premiseregistration/savePremiseRegCommonData'
        },
        {
            text: 'Clear',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function(){
                this.up('form').getForm().reset();
            }
        }
    ]
});